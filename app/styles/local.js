// Function to update a specific key's value in an array of objects
function updateValueInArray(array, index, keyToUpdate, newValue) {
  // Check if the index is valid
  if (index >= 0 && index < array.length) {
    // Update the key's value
    array[index][keyToUpdate] = newValue;
  }
}

// Function to delete a specific key from an object in an array
function deleteKeyInArray(array, index, keyToDelete) {
  // Check if the index is valid
  if (index >= 0 && index < array.length) {
    // Delete the key from the object
    delete array[index][keyToDelete];
  }
}

// Example usage:
// Suppose you have an array of objects stored in localStorage under the key 'myData'
const storedData = JSON.parse(localStorage.getItem('myData'));

// Specify the index, key to update, new value, key to delete
const indexToUpdate = 0; // Replace with the index you want to update/delete
const keyToUpdate = 'yourKeyToUpdate';
const newValue = 'newUpdatedValue';
const keyToDelete = 'yourKeyToDelete';

// Call the functions to update and delete
updateValueInArray(storedData, indexToUpdate, keyToUpdate, newValue);
deleteKeyInArray(storedData, indexToUpdate, keyToDelete);

// Update the modified array in localStorage
localStorage.setItem('myData', JSON.stringify(storedData));
