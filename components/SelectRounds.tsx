import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, RadioButton, Text } from 'react-native-paper';
import Round from './Round';
import { TaskContext } from '../context/TaskContext';

const SelectRounds : React.FC = () : React.ReactElement => {

  const { rounds, setRounds } = useContext(TaskContext);

  const [start, setStart] = useState<boolean>(false);

  return (
    <>
      {(start)
        ? <Round />
        : <View
            style={styles.container}
          >
            <Text
              style={{ fontSize: 26, marginBottom: 20 }}
            >Kierroksia? (1-10)</Text>

            <RadioButton.Group onValueChange={newValue => setRounds(Number(newValue))} value={rounds.toString()}>
              <View style={styles.rowContainer}>
                <RadioButton value="1" />
                <Text>1</Text>
              </View>
              <View style={styles.rowContainer}>
                <RadioButton value="2" />
                <Text>2</Text>
              </View>
              <View style={styles.rowContainer}>
                <RadioButton value="3" />
                <Text>3</Text>
              </View>
              <View style={styles.rowContainer}>
                <RadioButton value="4" />
                <Text>4</Text>
              </View>
              <View style={styles.rowContainer}>
                <RadioButton value="5" />
                <Text>5</Text>
              </View>
              <View style={styles.rowContainer}>
                <RadioButton value="6" />
                <Text>6</Text>
              </View>
              <View style={styles.rowContainer}>
                <RadioButton value="7" />
                <Text>7</Text>
              </View>
              <View style={styles.rowContainer}>
                <RadioButton value="8" />
                <Text>8</Text>
              </View>
              <View style={styles.rowContainer}>
                <RadioButton value="9" />
                <Text>9</Text>
              </View>
              <View style={styles.rowContainer}>
                <RadioButton value="10" />
                <Text>10</Text>
              </View>
            </RadioButton.Group>

            <Button
              style={{ marginTop: 20 }}
              mode="contained"
              onPress={() => setStart(true)}
            >Aloita kierros 1</Button>
            
          </View>
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent : 'center',
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
})

export default SelectRounds;