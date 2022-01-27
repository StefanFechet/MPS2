# MPS-Project-2

## Database
Baza de date (MySQL) ruleaza intr-un container Docker.
Se numeste **mps_project_2** si are tabelele User, Sala, Rezervare, Abonare, Notificare cu structura de [aici](https://dbdiagram.io/d/61e6fcccbb7a646986f92e5e?fbclid=IwAR3WZPKSwEfPtsLDXud5VyyJC4BMGRKgyXQ4Y68QaKrsP74YhrIoUcV24Sc).
Pentru a porni baza de date pe portul 3307 se foloseste:
```
docker run --name mysql-db -d -p 3307:3307 -e MYSQL_ROOT_PASSWORD=root -v {absolute_path_to_projects_root}/mysql-db-data:/var/lib/mysql mysql
```
Pentru a intra in container:
```
docker exec -it mysql-db bash
```
Pentru a accesa prompt-ul mysql:
```
mysql -u root -proot
```
Pentru a opri container-ul si implicit baza de date:
```
docker stop mysql-db
```
