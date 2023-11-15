const test = store => next => action => { console.log('test'); next(action) }

export default test;
