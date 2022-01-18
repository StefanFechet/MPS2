package com.example.demo.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


@Entity
@Table(name = "Abonare")
public class Abonare {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    @NotNull
    int id_sala;
    @NotNull
    int id_user;

    public Abonare() {
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId_sala() {
        return id_sala;
    }

    public void setId_sala(int id_sala) {
        this.id_sala = id_sala;
    }

    public int getId_user() {
        return id_user;
    }

    public void setId_user(int id_user) {
        this.id_user = id_user;
    }

    public Abonare(int id_sala, int id_user) {
        this.id_sala = id_sala;
        this.id_user = id_user;
    }

    @Override
    public String toString() {
        return "Abonare{" +
                "id=" + id +
                ", id_sala=" + id_sala +
                ", id_user=" + id_user +
                '}';
    }
}
