FROM openjdk:17-alpine

WORKDIR /app

COPY target/consola-backend-1.0.0-SNAPSHOT.jar /app/app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]

FROM maven:3.9.5-sapmachine-17 AS build

COPY . /app

WORKDIR /app

RUN mvn clean package

FROM openjdk:17-jdk-alpine

COPY --from=build /app/target/consola*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
