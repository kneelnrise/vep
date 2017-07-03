package vep

import com.typesafe.config.ConfigFactory

case class ServerConfiguration(
  host: String,
  port: Int
)

case class DatabaseConfiguration(
  host: String,
  port: Int,
  username: String,
  password: String,
  name: String
)

object Environment extends Enumeration {
  val dev, prod = Value

  def fromString(value: String): Environment.Value = {
    values.find(_.toString == value)
      .getOrElse(prod)
  }
}

class Configuration {
  private val config = ConfigFactory.load()

  lazy val environment: Environment.Value = Environment.fromString(config.getString("vep.environment"))

  lazy val server = ServerConfiguration(
    host = config.getString("vep.server.host"),
    port = config.getInt("vep.server.port")
  )

  lazy val database = DatabaseConfiguration(
    host = config.getString("vep.database.host"),
    port = config.getInt("vep.database.port"),
    username = config.getString("vep.database.username"),
    password = config.getString("vep.database.password"),
    name = config.getString("vep.database.name")
  )
}