name := "vepserver"

version := "v0.1.3"

scalaVersion := "2.11.6"

resolvers ++= Seq(
  "sonatype releases" at "https://oss.sonatype.org/content/repositories/releases/",
  "sonatype snapshots" at "https://oss.sonatype.org/content/repositories/snapshots/",
  "typesafe repo" at "http://repo.typesafe.com/typesafe/releases/",
  "spray repo" at "http://repo.spray.io/",
  "scalaz-bintray" at "http://dl.bintray.com/scalaz/releases"
)

libraryDependencies ++= Seq(
  "io.spray" %% "spray-json" % "1.3.2",
  "io.spray" %% "spray-can" % "1.3.3",
  "io.spray" %% "spray-routing" % "1.3.3",
  "io.spray" %% "spray-testkit" % "1.3.3",
  "com.typesafe" % "config" % "1.3.0",
  "com.typesafe.akka" %% "akka-actor" % "2.3.2",
  "com.typesafe.play" %% "anorm" % "2.4.0-M3",
  "com.h2database" % "h2" % "1.3.166",
  "mysql" % "mysql-connector-java" % "5.1.12",
  "commons-validator" % "commons-validator" % "1.4.0",
  "org.apache.commons" % "commons-lang3" % "3.4",
  "org.slf4j" % "slf4j-nop" % "1.6.4",
  ("org.specs2" %% "specs2" % "2.4.17").exclude("org.mockito", "mockito-core"),
  "org.seleniumhq.selenium" % "selenium-java" % "2.28.0" % "test"
)

scalacOptions in Test ++= Seq("-Yrangepos")

mainClass in assembly := Some("vep.Boot")