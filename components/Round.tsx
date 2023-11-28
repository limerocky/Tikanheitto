import React, { useContext, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { Competitor, TaskContext } from '../context/TaskContext';
import Results from './Results';

const Round : React.FC = () : React.ReactElement => {

  const { rounds, competitors, setCompetitors, addCompetition, resultView, setResultView } = useContext(TaskContext);

  const [round, setRound] = useState<number>(1);
  const [roundPoints, setRoundPoints] = useState<Competitor[]>(competitors);

  const handlePointsChange = (id : number, text : string) : void => {

    const points : number = Number(text.replace(/[^0-9]/g, ''));

    const newPoints : Competitor[] = roundPoints.map((competitor : Competitor, idx : number) => {

      if (idx === id) {
        return {
          ...competitor,
          points: points,
        }
      }
      return competitor;
    });

    setRoundPoints(newPoints);

  }

  const handleNextRound = () : void => {

    if (round < rounds) {
      
      setRound(round + 1);

      const newCompetitors : Competitor[] = competitors.map((competitor : Competitor, idx : number) => {
        return {
          ...competitor,
          points: competitor.points + roundPoints[idx].points,
        }
      });

      setCompetitors(newCompetitors);

      setRoundPoints(roundPoints.map((competitor: Competitor) => ({ ...competitor, points: 0 })));

    } else {

      const sortedCompetitors : Competitor[] = competitors.sort((a : Competitor, b : Competitor) => b.points - a.points);

      setCompetitors(sortedCompetitors);

      addCompetition();

      setResultView(true);

    }
  }

  return (
    <View>

      {(resultView)

        ? <Results />

        : <>
            <View
              style={{ alignItems: 'center', flex : 1 }}
            >
              <Text
                style={{ marginTop: 40, fontSize: 25 }}
              >{`Kierros ${round}/${rounds}`}</Text>

              <ScrollView
                contentContainerStyle={{ alignItems: 'center' }}
              >
                {competitors.map((competitor : Competitor, idx : number) => {
                  return (
                    <View
                      style={{ flexDirection: 'row', marginTop: 20 }}
                      key={idx}
                    >
                      <Text 
                        style={{ fontSize: 20, maxWidth: '70%', marginRight: 15 }}
                      >{competitor.name}</Text>

                      <TextInput 
                        label="Pisteet"
                        keyboardType="numeric"
                        value={roundPoints[idx].points.toString()}
                        onChangeText={(text : string) => handlePointsChange(idx, text)}
                      />
                    </View>
                  );
                })}
              </ScrollView>

              <Button
                style={{ margin: 20 }}
                mode="contained"
                onPress={() => handleNextRound()}
              >{(round < rounds) ? `Siirry kierrokseen ${round + 1}/${rounds}` : "Näytä lopputulokset"}</Button>
            </View>
          </>
      }

    </View>
  );
}

export default Round;