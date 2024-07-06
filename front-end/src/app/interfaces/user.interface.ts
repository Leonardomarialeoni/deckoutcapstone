import { Card } from "./card.interface";

export interface User {
    nome: string;
    cognome: string;
    email: string;
    username: string;
    password: string;
    id: number;
    collezione: number[];
 }