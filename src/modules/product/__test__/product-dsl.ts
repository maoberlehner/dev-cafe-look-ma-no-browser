import type { Step } from '../../../../test/types';

export const doOneThing: Step = () => {};

export const doMultipleThings: Step = () => [() => {}];
