FROM mysql:5.7

ENV MYSQL_DATABASE reservations

COPY ./sql-scripts/ /docker-entrypoint-initdb.d/
