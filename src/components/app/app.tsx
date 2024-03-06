import MainScreen from '../../pages/main/main';
import { ListOffersProps } from '../../pages/main/main';


function App(props: { count: number }): JSX.Element {
  return (
    <MainScreen {...props} />
  );
}

/*
function App({ offers }: ListOffersProps): JSX.Element {
  return (
    <MainScreen offers={offers} />
  );
}
*/

export default App;
