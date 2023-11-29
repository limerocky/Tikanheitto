import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { Competitor, TaskContext } from '../context/TaskContext';

const Round : React.FC = () : React.ReactElement => {

  const { competitors, setCompetitors, 
          resultView, setResultView, 
          setNewCompetitionView, setRoundsView,
          addCompetition, rounds } = useContext(TaskContext);

  const [round, setRound] = useState<number>(1);
  const [roundPoints, setRoundPoints] = useState<Competitor[]>(competitors);

  const handlePointsChange = (id : number, text : string) : void => {

    const points : number = Number(text.replace(/[^0-9]/g, ''));

    if (points > 50) return;

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

      setCompetitors((prevCompetitors : Competitor[]) => {
        return prevCompetitors.map((competitor : Competitor, idx : number) => {
          return {
            ...competitor,
            points: competitor.points + roundPoints[idx].points,
          }
        });
      });

      setRoundPoints(roundPoints.map((competitor: Competitor) => ({ ...competitor, points: 0 })));

    } else {

      const newCompetitors : Competitor[] = competitors.map((competitor : Competitor, idx : number) => {
        return {
          ...competitor,
          points: competitor.points + roundPoints[idx].points,
        }
      });

      const sortedCompetitors : Competitor[] = newCompetitors.sort((a : Competitor, b : Competitor) => b.points - a.points);

      setCompetitors(sortedCompetitors);

      setResultView(true);
    }
  }

  useEffect(() => {

    if (resultView) {
      addCompetition();

      setNewCompetitionView(false);
      setRoundsView(false);
    }

  }, [resultView])

  return (
    <View style={styles.container}>
      
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
                style={{ fontSize: 20, width : 150 }}
              >{competitor.name}</Text>

              <TextInput 
                label="(0-50)"
                keyboardType="numeric"
                error={roundPoints[idx].points > 50}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Round;