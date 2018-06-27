name := "vep"

version := "1.3.2"

scalaVersion := "2.12.6"

libraryDependencies += "com.typesafe" % "config" % "1.3.1"
libraryDependencies += "com.typesafe.scala-logging" %% "scala-logging" % "3.5.0"
libraryDependencies += "org.slf4j" % "slf4j-simple" % "1.7.25"
libraryDependencies += "com.typesafe.akka" %% "akka-http" % "10.0.9"
libraryDependencies += "com.typesafe.akka" %% "akka-http-spray-json" % "10.0.9"
libraryDependencies += "com.typesafe.play" % "anorm_2.12" % "2.5.3"
libraryDependencies += "ch.megard" %% "akka-http-cors" % "0.1.10"
libraryDependencies += "org.mindrot" % "jbcrypt" % "0.4"
libraryDependencies += "org.postgresql" % "postgresql" % "9.4.1212"
libraryDependencies += "org.scalikejdbc" %% "scalikejdbc" % "2.5.0"
libraryDependencies += "org.apache.commons" % "commons-email" % "1.4"
libraryDependencies += "com.github.tototoshi" %% "scala-csv" % "1.3.5"
libraryDependencies += "org.scala-lang.modules" % "scala-xml_2.12" % "1.0.6"

libraryDependencies += "org.scalatest" %% "scalatest" % "3.0.4" % "test"
libraryDependencies += "org.scalacheck" %% "scalacheck" % "1.13.5" % "test"

unmanagedSourceDirectories in Compile += baseDirectory.value / "src" / "main" / "scala-definiti"
unmanagedSourceDirectories in Test += baseDirectory.value / "src" / "test" / "scala-definiti"

enablePlugins(JavaAppPackaging)
mappings in (Compile, packageDoc) := Seq()
