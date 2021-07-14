import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import { Result } from "./components/Result";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import CheckboxLabels from "./test";

function App() {
    return (
        <>
            <Header />
            <Router>
                <Switch>
                    <Route exact path="/" component={Step1} />
                    <Route path='/step2' component={Step2} />
                    <Route path='/step3' component={Step3} />
                    <Route path='/result' component={Result} />
                    <Route path='/test' component={CheckboxLabels} />

                </Switch>
            </Router>
        </>
    );
}

export default App;
