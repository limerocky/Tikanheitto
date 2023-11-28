import { PaperProvider } from 'react-native-paper';
import { TaskProvider } from './context/TaskContext';
import Main from './Main';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App : React.FC = () : React.ReactElement => {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <TaskProvider>
          <Main />
        </TaskProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default App;