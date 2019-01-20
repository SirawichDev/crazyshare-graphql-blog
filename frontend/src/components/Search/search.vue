<template>
  <form class="search-form">
    <input
      type="search"
      value=""
      placeholder="Search"
      class="search-input"
    >
    <button
      type="submit"
      class="search-button"
    >
      <svg class="submit-button">
        <use
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xlink:href="#search"
        ></use>
      </svg>
    </button>
    <div class="search-option">
      <div>
        <input
          name="type"
          type="radio"
          value="type-users"
          id="type-users"
        >
        <label for="type-users">
          <svg class="edit-pen-title">
            <use
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="#user"
            ></use>
          </svg>
          <span>Users</span>
        </label>
      </div>

      <div>
        <input
          name="type"
          type="radio"
          value="type-posts"
          id="type-posts"
        >
        <label for="type-posts">
          <svg class="edit-pen-title">
            <use
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="#post"
            ></use>
          </svg>
          <span>Posts</span>
        </label>
      </div>
      <div>
        <input
          name="type"
          type="radio"
          value="type-images"
          id="type-images"
        >
        <label for="type-images">
          <svg class="edit-pen-title">
            <use
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="#images"
            ></use>
          </svg>
          <span>Images</span>
        </label>
      </div>
      <div>
        <input
          name="type"
          type="radio"
          value="type-special"
          id="type-special"
          checked=""
        >
        <label for="type-special">
          <svg class="edit-pen-title">
            <use
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="#special"
            ></use>
          </svg>
          <span>Special</span>
        </label>
      </div>
    </div>
  </form>
</template>
