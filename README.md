# MPS-Project-2

## Database
Baza de date (MySQL) ruleaza intr-un container Docker.
Se numeste **mps_project_2** si are tabelele User, Sala, Rezervare cu structura de [aici](https://dbdiagram.io/d/5fd88bb99a6c525a03bb1dcc).
Pentru a porni baza de date pe portul 3306 se foloseste:
```
docker run --name mysql-db -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -v {absolute_path_to_projects_root}/mysql-db-data:/var/lib/mysql mysql
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
