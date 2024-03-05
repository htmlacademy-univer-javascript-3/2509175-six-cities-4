import MainScreen from '../../pages/main/main';
import { ListCardsProps } from '../../pages/main/main';


function App({ cards }: ListCardsProps): JSX.Element {
  return (
    <MainScreen cards={cards} />
  );
}

export default App;
