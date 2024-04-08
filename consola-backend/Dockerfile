FROM maven:3.9.5-sapmachine-17 AS build

WORKDIR /app

COPY . .

RUN mvn clean package

FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY --from=build /app/target/consola*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
