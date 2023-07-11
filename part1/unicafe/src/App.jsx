import { useState } from "react";

import FeedbackSection from "./Components/FeedbackSection";
import StatisticsSection from "./Components/StatisticsSection";

const App = () => {
  const [statistics, setStatistics] = useState({
    goodCounter: 0,
    neutralCounter: 0,
    badCounter: 0,
    totalCounter: 0,
    average: 0,
    positiveFeedbackRatio: 0,
  });

  function computeAverage(goodCounter, badCounter, totalCounter) {
    return (goodCounter + badCounter * -1) / totalCounter;
  }

  function computePositiveFeedbackRatio(goodCounter, totalCounter) {
    return 100 * (goodCounter / totalCounter);
  }

  const incrementGoodCounter = () => {
    const newGoodCounter = statistics.goodCounter + 1;
    const newTotalCounter =
      newGoodCounter + statistics.neutralCounter + statistics.badCounter;
    const newAverage = computeAverage(
      newGoodCounter,
      statistics.badCounter,
      newTotalCounter
    );
    const newPositiveFeedbackRatio = computePositiveFeedbackRatio(
      newGoodCounter,
      newTotalCounter
    );
    const newStats = {
      ...statistics,
      goodCounter: newGoodCounter,
      totalCounter: newTotalCounter,
      average: newAverage,
      positiveFeedbackRatio: newPositiveFeedbackRatio,
    };

    setStatistics(newStats);
  };

  const incrementNeutralCounter = () => {
    const newNeutralCounter = statistics.neutralCounter + 1;
    const newTotalCounter =
      statistics.goodCounter + newNeutralCounter + statistics.badCounter;
    const newAverage = computeAverage(
      statistics.goodCounter,
      statistics.badCounter,
      newTotalCounter
    );
    const newPositiveFeedbackRatio = computePositiveFeedbackRatio(
      statistics.goodCounter,
      newTotalCounter
    );
    const newStats = {
      ...statistics,
      neutralCounter: newNeutralCounter,
      totalCounter: newTotalCounter,
      average: newAverage,
      positiveFeedbackRatio: newPositiveFeedbackRatio,
    };

    setStatistics(newStats);
  };

  const incrementBadCounter = () => {
    const newBadCounter = statistics.badCounter + 1;
    const newTotalCounter =
      newBadCounter + statistics.neutralCounter + statistics.goodCounter;
    const newAverage = computeAverage(
      statistics.goodCounter,
      newBadCounter,
      newTotalCounter
    );
    const newPositiveFeedbackRatio = computePositiveFeedbackRatio(
      statistics.goodCounter,
      newTotalCounter
    );
    const newStats = {
      ...statistics,
      badCounter: newBadCounter,
      totalCounter: newTotalCounter,
      average: newAverage,
      positiveFeedbackRatio: newPositiveFeedbackRatio,
    };

    setStatistics(newStats);
  };

  return (
    <>
      <FeedbackSection
        incrementGood={incrementGoodCounter}
        incrementNeutral={incrementNeutralCounter}
        incrementBad={incrementBadCounter}
      />
      <StatisticsSection
        goodCounter={statistics.goodCounter}
        neutralCounter={statistics.neutralCounter}
        badCounter={statistics.badCounter}
        average={statistics.average}
        totalCounter={statistics.totalCounter}
        positiveFeedbackRatio={statistics.positiveFeedbackRatio}
      />
    </>
  );
};

export default App;
