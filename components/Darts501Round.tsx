import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { Competitor, TaskContext } from '../context/TaskContext';
import { Button, TextInput } from 'react-native-paper';

const Darts501Round : React.FC = () : React.ReactElement => {

  const { competitors, setCompetitors, 
          resultView, setResultView, 
          setNewCompetitionView, setRoundsView, 
          addCompetition } = useContext(TaskContext);

  const [round, setRound] = useState<number>(1);
  const [roundPoints, setRoundPoints] = useState<Competitor[]>(
    competitors.map((competitor : Competitor) => ({ ...competitor, points: 0 }))
  );
  const [winState, setWinState] = useState<boolean>(false);

  const handlePointsChange = (id : number, text : string) : void => {

    const points : number = Number(text.replace(/[^0-9]/g, ''));

    if (points > 180) return;

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

    // Pisteet nollaantuvat, jos nollan alle mennään.

    const newCompetitors : Competitor[] = competitors.map((competitor : Competitor, idx : number) => {
      return {
        ...competitor,
        points: (competitor.points - roundPoints[idx].points < 0) ? competitor.points : competitor.points - roundPoints[idx].points,
      }
    });

    if (winState) {

      setResultView(true);

    }
    else if (newCompetitors.some((competitor : Competitor) => competitor.points === 0)) {

      setCompetitors(newCompetitors.sort((a : Competitor, b : Competitor) => a.points - b.points));

      setRoundPoints(roundPoints.map((competitor: Competitor) => ({ ...competitor, points: 0 })));

      setWinState(true);
    }
    else {
      setRound(round + 1);

      setCompetitors(newCompetitors);

      setRoundPoints(roundPoints.map((competitor: Competitor) => ({ ...competitor, points: 0 })));
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
      >{`Kierros ${round}`}</Text>

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
                style={{ fontSize: 20, width : 220 }}
              >{
                `${competitor.name}\nPisteet: ${competitor.points} - ${roundPoints[idx].points} = ${(competitor.points - roundPoints[idx].points < 0) ? competitor.points : (competitor.points - roundPoints[idx].points)}`
              }</Text>

              <TextInput 
                label="(0-180)"
                keyboardType="numeric"
                error={roundPoints[idx].points > 180}
                disabled={winState}
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
      >{(winState) ? "Näytä lopputulokset" : `Siirry kierrokseen ${round + 1}`}</Button>

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

export default Darts501Round;