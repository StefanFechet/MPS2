package com.example.demo.models;

public class Rezervare_full {
    Rezervare rezervare;
    Sala sala;

    public Rezervare_full(Rezervare rezervare, Sala sala) {
        this.rezervare = rezervare;
        this.sala = sala;
    }

    public Rezervare getRezervare() {
        return rezervare;
    }

    public void setRezervare(Rezervare rezervare) {
        this.rezervare = rezervare;
    }

    public Sala getSala() {
        return sala;
    }

    public void setSala(Sala sala) {
        this.sala = sala;
    }

    @Override
    public String toString() {
        return "Rezervare_full{" +
                "rezervare=" + rezervare +
                ", sala=" + sala +
                '}';
    }
}
