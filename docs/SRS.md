# Software Requirements and Specifications

## Preface

This file is a mini pseudo-SRS (Software Requirements and Specifications) document. Such documents give high-level requirements and their corresponding specifications for the operation of the given software. All specifications, data models, etc. are given only in the context of the interface between primary actors (users), the system (application), and secondary actors (third-party services such as authentication and APIs). Specific implementation details such as those pertaining to the tech stack, database organization and otherwise are instead included in other documentation.

## Use Cases

Use cases are high-level functionalities as seen by the user(s).

### 1. Posting a Workout Split

Users should be able to create and share a workout plan. This would involve inputting:

1. The types of exercises in a given workout
2. The number of sets and repititions of each exercise (with an option to specify "until failure" or "until X reps in reserve")
3. The calendar frequency of workouts (i.e. which workout is done on which day)
4. A suggestion for how users should progress (adding weight, longer runs, etc.)

Users that post workout plans would have a dashboard to see how many other users have their plan saved.

### 2. Following a Workout Split

Users should be able to save workout plans posted by other users. They can have one plan "active" at any given time, while others will stay in a saved/archived section.

During a workout, users can check off exercises they have completed as well as the weights they used for each set and whether of not they completed every repitition.

Over time, and after sticking with a plan for multiple weeks, users will be able to view a dashboard showing how the weight they lift (or distance they ran, height they jumped, etc) has changed over time. Additionally, the plan will also give a suggestion for increases in weight or intensity.

Users can also "fork" a plan by customizing it and they will also have the option to share this fork.