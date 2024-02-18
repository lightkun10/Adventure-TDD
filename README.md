# Adventure TDD (Challenge)

## Overview

This project showcases the development of new features for an adventure game using Test Driven Development (TDD) principles. The goal is to integrate two separate adventure projects, develop new features individually using TDD, and finally integrate the features into the original project.

## Purpose

The purpose of this project is to gain experience in OOP principles, including readability, portability, and the use of Single Responsibility Principle (SRP) and Don't Repeat Yourself (DRY). By following TDD practices, contributors can ensure the clarity and unambiguous API requirements of the codebase.

## Structure

The project is structured as follows:

- **Integration**: Two separate adventure game projects are integrated into one cohesive project.
- **New Features**: Two new features are developed, each implemented as an inherited child class of existing classes such as Item, Room, Character, or Enemy.
- **Test Specs**: Mocha/Chai test specs are written for each new feature, focusing on describing the behavior needed for the feature.
- **Code Implementation**: Each feature is implemented individually by one partner, based on the test specs provided by the other partner.
- **Integration**: The implemented features are integrated into the original project.

## Requirements

- Two sets of detailed Mocha/Chai test specs describing the features
- The features should include one or more new child classes inheriting from Item, Room, Character, or Enemy.
- Working code implementations of the features with passing test suites

## Feature Ideas

Some future feature ideas that are considered to be added include:

- Create a DarkRoom that inherits from Room and a Light that inherits from Item. Dark rooms only show a description of "You cannot see anything" unless a light is in the room or being held.
- Create a Shop that inherits from Room, allowing players to buy and sell items using gold.
- Create a Pet that inherits from Character, following the player around and defending them from attackers after being fed a treat.

## Personal Journey

This project serves as a reflection of my journey in learning and applying OOP principles, problem solving, commitment, and TDD practices.
