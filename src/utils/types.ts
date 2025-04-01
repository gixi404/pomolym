import type { ChangeEvent } from "react";

type Component = React.JSX.Element | React.JSX.Element[];

type Interval = ReturnType<typeof setInterval>;

type InputChange = ChangeEvent<HTMLInputElement>;

export type { Component, Interval, InputChange };
