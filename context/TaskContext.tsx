import React, { createContext, useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';

export const TaskContext : React.Context<any> = createContext(undefined);

interface Props {
    children : React.ReactNode;
}

export interface Competition {
    id : number;
    name : string;
    timestamp : string;
}

export interface Competitor {
    name : string;
    points : number;
}

const db : SQLite.Database = SQLite.openDatabase("competitions.db");

/*db.transaction(
    (tx : SQLite.SQLTransaction) => {
        tx.executeSql(`DROP TABLE competitions`)
    }, 
    (err : SQLite.SQLError) => console.log(err)
);*/

db.transaction(
    (tx : SQLite.SQLTransaction) => {
        tx.executeSql(`CREATE TABLE IF NOT EXISTS competitions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    }, 
    (err : SQLite.SQLError) => console.log(err)
);

db.transaction(
    (tx : SQLite.SQLTransaction) => {
        tx.executeSql(`CREATE TABLE IF NOT EXISTS competitors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            points INTEGER NOT NULL,
            competition_id INTEGER NOT NULL,
            FOREIGN KEY (competition_id) REFERENCES competitions (id)
        )`);
    }, 
    (err : SQLite.SQLError) => console.log(err)
);

export const TaskProvider : React.FC<Props> = (props : Props) : React.ReactElement => {

    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [competitors, setCompetitors] = useState<Competitor[]>([]);
    const [rounds, setRounds] = useState<number>(1);
    const [resultView, setResultView] = useState<boolean>(false);
    const [newCompetitionView, setNewCompetitionView] = useState<boolean>(false);
    const [roundsView, setRoundsView] = useState<boolean>(false);

    const getCompetitions = () : void => {

        db.transaction(
            (tx : SQLite.SQLTransaction) => {
                tx.executeSql(`SELECT * FROM competitions`, [],
                    (_tx : SQLite.SQLTransaction, rs : SQLite.SQLResultSet) => {
                        setCompetitions(rs.rows._array);
                    }
                );
            }, 
            (err : SQLite.SQLError) => console.log(err)
        );
    };

    const getCompetitors = (id : number) : void => {

        db.transaction(
            (tx : SQLite.SQLTransaction) => {
                tx.executeSql(`SELECT * FROM competitors WHERE competition_id = ?`, [id],
                    (_tx : SQLite.SQLTransaction, rs : SQLite.SQLResultSet) => {
                        setCompetitors(rs.rows._array);
                    }
                );
            }, 
            (err : SQLite.SQLError) => console.log(err)
        );

    }

    const addCompetition = (name : string = "Mökkitikka") : void => {

        db.transaction(
            (tx : SQLite.SQLTransaction) => {
                tx.executeSql(`INSERT INTO COMPETITIONS (name) VALUES (?)`, [name],
                    (_tx : SQLite.SQLTransaction, rs : SQLite.SQLResultSet) => {
                        competitors.forEach((competitor : Competitor) => {
                            tx.executeSql(`INSERT INTO competitors (name, points, competition_id)
                                            VALUES (?, ?, ?)`, [competitor.name, competitor.points, rs.insertId!]
                            );
                        });
                    }
                );
            }, 
            (err : SQLite.SQLError) => console.log(err)
        );
    };

    useEffect(() => {
        
        getCompetitions();

    }, [])

    return (
        <TaskContext.Provider value={
            {
                competitions,
                rounds,
                setRounds,
                competitors,
                setCompetitors,
                resultView,
                setResultView,
                newCompetitionView,
                setNewCompetitionView,
                roundsView,
                setRoundsView,
                addCompetition,
                getCompetitors
            }
        }>
            {props.children}
        </TaskContext.Provider>
    );
}