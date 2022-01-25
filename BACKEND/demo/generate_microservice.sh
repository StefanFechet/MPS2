docker stop mps2
docker rm mps2
docker rmi -f spring-boot-mysql-jpa-hibernate
mvn clean install
docker build -t spring-boot-mysql-jpa-hibernate .
docker run -t -d --name mps2 -p 8080:8080 -v /home/stefan/Desktop/demo:/home spring-boot-mysql-jpa-hibernate
