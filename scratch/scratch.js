import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
const {array, help} = ham;
help()

let poo;
navigator.geolocation.getCurrentPosition(pos => {
  console.log('pos', pos)
  poo = pos
});

setTimeout(() => console.log('poo', poo), 1000)

const geo1 = {
  accuracy: 12.451000213623047,
  altitude: 322.43163376277795,
  altitudeAccuracy: null,
  heading: null,
  latitude: 33.609636,
  longitude: -112.3477068,
  speed: null,
  geo1Prop1: 11,
  geo1Prop2: 12,
  geoProp: -9,

}

const geo2 = {
  accuracy: 6.383999824523926,
  altitude: 322.2981596154862,
  altitudeAccuracy: null,
  heading: 149.5409698486328,
  latitude: 33.6095643,
  longitude: -112.3476723,
  speed: 0.33694085478782654,
  geo2Prop1: 21,
  geo2Prop2: 22,
  geoProp: 9,

}

const zipProps = () => {};
const getSharedProps = (keys1 = [], keys2 = []) => {
  const union = [...keys1, ...keys2];
  console.log('union', union)
};

const geoCompare = (g1, g2) => {
  /*
  1.  Compare omly props found in both
  2. if nulls, replace with 0s before compare
  3. return obj containing omly changes
  */
  const k1 = Object.keys(g1)
  const k2 = Object.keys(g2)
getSharedProps(k1, k2)

};

geoCompare(geo1, geo2)