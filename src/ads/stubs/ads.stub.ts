import { stubPropertyCreation } from 'src/lib/stubs/property.stub';
const shouldNotBeMatchedArr1 = [
  { ...stubPropertyCreation(), price: 1 },
  { ...stubPropertyCreation(), price: 200000 },
  { ...stubPropertyCreation(), price: 89 },
  { ...stubPropertyCreation(), price: 111 },
];
const shouldNotBeMatchedArr2 = [
  { ...stubPropertyCreation(), district: 'district1' },
  { ...stubPropertyCreation(), district: 'district1' },
  { ...stubPropertyCreation(), district: 'district1' },
  { ...stubPropertyCreation(), district: 'district1' },
];
const shouldNotBeMatchedArr3 = [
  { ...stubPropertyCreation(), area: 'area1' },
  { ...stubPropertyCreation(), area: 'area1' },
  { ...stubPropertyCreation(), area: 'area1' },
  { ...stubPropertyCreation(), area: 'area1' },
];

export const shouldBeMatchedArr = () => [
  stubPropertyCreation(),
  { ...stubPropertyCreation(), price: 90 },
  { ...stubPropertyCreation(), price: 110 },
  { ...stubPropertyCreation(), price: 100 },
  { ...stubPropertyCreation(), price: 95 },
];

export const shouldNotBeMatchedArr = () => [
  ...shouldNotBeMatchedArr1,
  ...shouldNotBeMatchedArr2,
  ...shouldNotBeMatchedArr3,
];
