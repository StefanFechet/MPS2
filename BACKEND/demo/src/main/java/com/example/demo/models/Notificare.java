package com.example.demo.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Entity
@Table(name = "Notificare")
public class Notificare {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    @NotNull
    int id_sala;
    @NotNull
    int id_user;
    @NotNull
    String mesaj;
    @NotNull
    Timestamp data_notificare;
    @NotNull
    boolean citit;

    public Notificare() {
    }

    public Notificare(int id_sala, int id_user, String mesaj, Timestamp data_notificare, boolean citit) {
        this.id_sala = id_sala;
        this.id_user = id_user;
        this.mesaj = mesaj;
        this.data_notificare = data_notificare;
        this.citit = citit;
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

    public String getMesaj() {
        return mesaj;
    }

    public void setMesaj(String mesaj) {
        this.mesaj = mesaj;
    }

    public Timestamp getData_notificare() {
        return data_notificare;
    }

    public void setData_notificare(Timestamp data_notificare) {
        this.data_notificare = data_notificare;
    }

    public boolean isCitit() {
        return citit;
    }

    public void setCitit(boolean citit) {
        this.citit = citit;
    }

    @Override
    public String toString() {
        return "Notificare{" +
                "id=" + id +
                ", id_sala=" + id_sala +
                ", id_user=" + id_user +
                ", mesaj='" + mesaj + '\'' +
                ", data_notificare=" + data_notificare +
                ", citit=" + citit +
                '}';
    }
}
