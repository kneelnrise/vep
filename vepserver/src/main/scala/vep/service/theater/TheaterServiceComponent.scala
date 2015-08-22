package vep.service.theater

import anorm.SqlParser._
import anorm._
import vep.AnormClient
import vep.exception.FieldErrorException
import vep.model.common.ErrorCodes
import vep.model.theater.{Theater, TheaterForm}
import vep.service.AnormImplicits
import vep.utils.DB

/**
 * Defines services impacting users.
 */
trait TheaterServiceComponent {
  def theaterService: TheaterService

  trait TheaterService {
    /**
     * Inserts a theater into database
     * @param theaterForm The theater to insert
     */
    def create(theaterForm: TheaterForm): Unit

    /**
     * Updates an existing theater from database
     * @param theaterForm The theater to update
     */
    def update(theaterForm: TheaterForm): Unit

    /**
     * Checks if the theater with given canonical exists
     * @param canonical The canonical check
     * @return True if there is a theater with given canonical, otherwise false
     */
    def exists(canonical: String): Boolean

    /**
     * Returns the list of all theaters
     */
    def findAll(): Seq[Theater]

    /**
     * Returns the theater with given canonical if exists.
     * @param canonical The canonical of the theater
     * @return The theater with given canonical
     */
    def findByCanonical(canonical: String): Option[Theater]
  }

}

trait TheaterServiceProductionComponent extends TheaterServiceComponent {
  self: AnormClient =>
  override lazy val theaterService = new TheaterServiceProduction

  class TheaterServiceProduction extends TheaterService with AnormImplicits {
    lazy val theaterParser =
      int("id") ~
        str("canonical") ~
        str("name") ~
        str("address") ~
        get[Option[String]]("content") ~
        int("fixed") ~ // not boolean in database
        get[Option[String]]("plan") ~
        get[Option[Int]]("maxSeats") map {
        case id ~ canonical ~ name ~ address ~ content ~ fixed ~ plan ~ maxSeats =>
          Theater(id, canonical, name, address, content, fixed == 1, plan, maxSeats)
      }

    override def create(theaterForm: TheaterForm): Unit = DB.withTransaction { implicit c =>
      // The use of SELECT FOR UPDATE provides a way to block other transactions
      // and to not throw any exception for because of canonical duplication.
      val nCanonical = SQL("SELECT count(*) FROM theater WHERE canonical = {canonical} FOR UPDATE")
        .on("canonical" -> theaterForm.canonical)
        .as(scalar[Long].single)

      if (nCanonical > 0) {
        throw new FieldErrorException("canonical", ErrorCodes.usedCanonical, "The canonical is already used.")
      } else {
        SQL("INSERT INTO theater(canonical, name, address, content, fixed, plan, maxSeats) VALUES({canonical}, {name}, {address}, {content}, {fixed}, {plan}, {maxSeats})")
          .on("canonical" -> theaterForm.canonical)
          .on("name" -> theaterForm.name)
          .on("address" -> theaterForm.address)
          .on("content" -> theaterForm.content)
          .on("fixed" -> theaterForm.fixed)
          .on("plan" -> theaterForm.plan)
          .on("maxSeats" -> theaterForm.maxSeats)
          .executeInsert()
      }
    }

    override def update(theaterForm: TheaterForm): Unit = DB.withTransaction { implicit c =>
      SQL( """
             | UPDATE theater
             | SET name = {name},
             | address = {address},
             | content = {content},
             | fixed = {fixed},
             | plan = {plan},
             | maxSeats = {maxSeats}
             | WHERE canonical = {canonical}
             | """.stripMargin)
        .on("canonical" -> theaterForm.canonical)
        .on("name" -> theaterForm.name)
        .on("address" -> theaterForm.address)
        .on("content" -> theaterForm.content)
        .on("fixed" -> theaterForm.fixed)
        .on("plan" -> theaterForm.plan)
        .on("maxSeats" -> theaterForm.maxSeats)
        .executeUpdate()
    }

    override def exists(canonical: String): Boolean = DB.withConnection { implicit c =>
      val n = SQL("SELECT COUNT(*) FROM theater WHERE canonical = {canonical}")
        .on("canonical" -> canonical)
        .as(scalar[Long].single)
      n == 1
    }

    override def findAll(): Seq[Theater] = DB.withConnection { implicit c =>
      SQL("SELECT id, canonical, name, address, content, fixed, plan, maxSeats FROM theater").as(theaterParser *)
    }

    override def findByCanonical(canonical: String): Option[Theater] = DB.withConnection { implicit c =>
      SQL("SELECT id, canonical, name, address, content, fixed, plan, maxSeats FROM theater WHERE canonical = {canonical}")
        .on("canonical" -> canonical)
        .as(theaterParser.singleOpt)
    }
  }

}