import "./App.css";
import useStore from "./state/store";
import ClassList from "./components/ClassList";
import Grid from "./components/primitives/Grid";
import Padding from "./components/primitives/Padding";
import RequirementList from "./components/RequirementList";
import { $requirements } from "./state/requirementsSelectors";
import GridItem from "./components/primitives/GridItem";
import Flex from "./components/primitives/Flex";
import { load, save } from "./util/data";
import AppFrame from "./components/primitives/AppFrame";

function App() {
  const requirements = useStore($requirements());

  return (
    <AppFrame>
      <Grid
        templateColumns="1fr 400px"
        templateRows="80px 1fr"
        areas={["h h", "c r"]}
        flood
      >
        <GridItem area="h">
          <Flex flood items="center" justify="space-between" padding="0 24px">
            <h1>Degree Planner</h1>
            <Flex>
              <button onClick={() => save()}>Save</button>
              <button onClick={() => load()}>Load</button>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem area="c">
          <ClassList />
        </GridItem>
        <Padding>
          <h2>Requirements</h2>
          <RequirementList
            requirements={requirements}
            onEdit={() => console.log("edit requirement")}
          />
        </Padding>
      </Grid>
    </AppFrame>
  );
}

export default App;
