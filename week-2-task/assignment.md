## Weekly Task

1. Given a string containing just the characters '(', ')', '{', '}', '[', ']', determine if the input string is valid. This means for an every number of left brackets, there should be an equal number of closing bracket that fits.

   Example 1
   Input
   "()"
   Output
   True

   Example 2
   Input
   "([)}",
   Output
   False

   Example 2
   Input
   "([)]",
   Output
   True

---

2. Pair Sum Problem
   Given an array of integers and a target sum, find two numbers in the array that add up to the target sum. You may not use the same element twice.Example 1:Input:nums = [2, 7, 11, 15]target = 9 Output:[0, 1] (because 2 + 7 = 9 and their corresponding indices in the array are 0 and 1)Explanation:The numbers 2 (at index 0) and 7 (at index 1) add up to the target sum 9. Example 2: Input:nums = [3,2, 4]target = 6 Output:[1, 2] (because 2 + 4 = 6 and their corresponding indices in the array are 1 and 2)Note:The
   Two Sum algorithm typically assumes that there is only one unique pair
   of numbers that add up to the target sum within the given array.

---

3. An
   online food ordering system uses a queue to manage incoming orders.

   - Implement a queue data structure to represent this order queue.
   - Explain how to add new orders to the queue.
   - Simulate processing orders by removing them from the front of the queue.
   - Discuss the efficiency of using a queue for this purpose.

   ***

4. Create a JavaScript function named recommendRestaurants that takes an array of restaurant objects as input. Each object should have the following properties:

   **name**: The name of the restaurant (string)
   _rating_: The average customer rating of the restaurant (number)
   The function should perform two functionalities:

- Sorting Restaurants:
  Sort the restaurants in descending order based on their rating values.
- Finding Restaurants by Rating:
  Given an optional targetRating
  number) passed as a second argument, return a new array containing only
  restaurants with a rating higher than or equal to the targetRating.

You can use an appropriate searching algorithm (e.g., built-in filter
methods).
Example

const restaurants = [
{ name: "Pizza Palace", rating: 4.8 },
{ name: "Curry Corner", rating: 4.2 },
{ name: "Amazing Asian", rating: 4.5 },
{ name: "Healthy Eats", rating: 3.9 },
];

Input
TargetRating == 4.4

const restaurants = [
{ name: "Pizza Palace", rating: 4.8 },
{ name: "Curry Corner", rating: 4.2 },
{ name: "Amazing Asian", rating: 4.5 },
{ name: "Healthy Eats", rating: 3.9 },
];

Output
function recommendRestaurants(restaurants, targetRating) returns

[
{ name: "Pizza Palace", rating: 4.8 },
{ name: "Amazing Asian", rating: 4.5 },
];

---

5. Insert a Node in a Sorted Linked List

Given a sorted linked list, insert a new node with a given value into the correct sorted position in the list.Example

    Input: head = [1, 2, 4, 5], value = 3
    Output: [1, 2, 3, 4, 5]

---

6. Reverse a Linked List

   Given the head of a singly linked list, reverse the list and return the new head.Example
   Input: head = [1, 2, 3, 4, 5]
   Output: [5, 4, 3, 2, 1]

YOU ARE TO ATTEMPT ANY 4 OUT OF THE ABOVE WITH ONE OUT OF QUESTIONS 4 OR 5 INCLUDED

Submission InstructionsWrite your code in any IDE and push to a git repository e.g. guthub, bitbucket etc. Ensure the visibility is set to public.
You are to submit the link to the repository.
