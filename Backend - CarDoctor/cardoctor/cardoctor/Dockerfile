#  define base docker image
FROM openjdk:21
LABEL maintainer="javaguides.net"
ADD target/cardoctor-0.0.1-SNAPSHOT.jar cardoctor-0.0.1-SNAPSHOT.jar
#  define entry point
ENTRYPOINT ["java", "-jar", "cardoctor-0.0.1-SNAPSHOT.jar"]
