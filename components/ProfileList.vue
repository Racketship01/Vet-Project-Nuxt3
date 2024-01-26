<template>
  <v-autocomplete
    :items="items"
    auto-select-first
    class="vcardsearch"
    density="comfortable"
    item-props
    menu-icon=""
    placeholder="Search"
    prepend-inner-icon="mdi-magnify"
    rounded
    theme="light"
    variant="solo"
  ></v-autocomplete>

  <!--  List line -->

  <v-list class="vcardlist" lines="two">
    <!-- <v-list-subheader>List of Patient</v-list-subheader> -->

    <div class="vlistemcon">
      <div class="vlistem">
        <v-list-item
          prepend-avatar="https://cdn.vuetifyjs.com/images/lists/1.jpg"
          title="Brunch this weekend?"
        >
          <template v-slot:subtitle>
            <span class="font-weight-bold">Ali Connors</span>
          </template>
        </v-list-item>
        <v-divider :thickness="2" class="vcardivider" inset></v-divider>
      </div>

      <div class="vlistem">
        <v-list-item
          prepend-avatar="https://cdn.vuetifyjs.com/images/lists/1.jpg"
          title="Brunch this weekend?"
        >
          <template v-slot:subtitle>
            <span class="font-weight-bold">Ali Connors</span>
          </template>
        </v-list-item>
        <v-divider class="vcardivider" inset></v-divider>
      </div>

      <div class="vlistem">
        <v-list-item
          prepend-avatar="https://cdn.vuetifyjs.com/images/lists/1.jpg"
          title="Brunch this weekend?"
        >
          <template v-slot:subtitle>
            <span class="font-weight-bold">Ali Connors</span>
          </template>
        </v-list-item>
        <v-divider class="vcardivider" inset></v-divider>
      </div>

      <div class="vlistem">
        <v-list-item
          prepend-avatar="https://cdn.vuetifyjs.com/images/lists/1.jpg"
          title="Brunch this weekend?"
        >
          <template v-slot:subtitle>
            <span class="font-weight-bold">Ali Connors</span>
          </template>
        </v-list-item>
        <v-divider class="vcardivider" inset></v-divider>
      </div>

      <div class="vlistem">
        <v-list-item
          prepend-avatar="https://cdn.vuetifyjs.com/images/lists/1.jpg"
          title="Brunch this weekend?"
        >
          <template v-slot:subtitle>
            <span class="font-weight-bold">Ali Connors</span>
          </template>
        </v-list-item>
        <v-divider class="vcardivider" inset></v-divider>
      </div>

      <div class="vlistem">
        <v-list-item
          prepend-avatar="https://cdn.vuetifyjs.com/images/lists/1.jpg"
          title="Brunch this weekend?"
        >
          <template v-slot:subtitle>
            <span class="font-weight-bold">Ali Connors</span>
          </template>
        </v-list-item>
        <v-divider class="vcardivider" inset></v-divider>
      </div>

      <div class="vlistem">
        <v-list-item
          prepend-avatar="https://cdn.vuetifyjs.com/images/lists/1.jpg"
          title="Brunch this weekend?"
        >
          <template v-slot:subtitle>
            <span class="font-weight-bold">Ali Connors</span>
          </template>
        </v-list-item>
        <v-divider class="vcardivider" inset></v-divider>
      </div>

      <div class="vlistem">
        <v-list-item
          prepend-avatar="https://cdn.vuetifyjs.com/images/lists/1.jpg"
          title="Brunch this weekend?"
        >
          <template v-slot:subtitle>
            <span class="font-weight-bold">Ali Connors</span>
          </template>
        </v-list-item>
        <v-divider class="vcardivider" inset></v-divider>
      </div>

      <div class="vlistem">
        <v-list-item
          prepend-avatar="https://cdn.vuetifyjs.com/images/lists/1.jpg"
          title="Brunch this weekend?"
        >
          <template v-slot:subtitle>
            <span class="font-weight-bold">Ali Connors</span>
          </template>
        </v-list-item>
      </div>

      <div class="vpagin">
        <v-pagination :length="4" rounded="circle"></v-pagination>
      </div>
    </div>
  </v-list>
</template>
