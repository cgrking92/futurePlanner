const loggerMiddleware = store => next => action => {
  const result = next(action);  
  // document.cookie ="storedData="+JSON.stringify(store.getState());
  document.cookie ="lifeData="+JSON.stringify(store.getState().Life);
  document.cookie ="trialVideoData="+JSON.stringify(store.getState().TrialVideo);
  document.cookie ="studyData="+JSON.stringify(store.getState().Study);
  return result;
}

export default loggerMiddleware;