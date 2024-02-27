prisma.clinic.create({
  data: {
    title: "Vueti-Vet",
    categories: {
      create: [
        {
          type: "category.value",
          slug: "category.value.slice(0,1).number.random()",
          pets: {
            create: [
              {
                petName: "petName.value",
                slug: "petName.value.slice(0,1).number.math.random()",
                age: "petAge.value",
                breed: "breed.value",
                birth: "birth.value",
                gender: "gender.value",
                owner: {
                  create: [
                    {
                      firstName: "firstName.value",
                      lastName: "lastName.value",
                      ownerAge: "ownerAge.value",
                      contact: "contact.value",
                      address: "address.value",
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
});

required;
hide - details;

postgres://postgres.xnoymaqkppyjzdezajin:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:5432/postgres

//New String and pw - 02-08-24
postgres://postgres.xnoymaqkppyjzdezajin:VqnQuC3PKYGgraGa@aws-0-us-west-1.pooler.supabase.com:5432/postgres

DATABASE_URL="postgresql://postgres:XaPoxROGhiJr1mvh@db.xnoymaqkppyjzdezajin.supabase.co:5432/postgres"


import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const petSelect = Prisma.validator<Prisma.PetArgs>()({
  select: {
    petName: true,
    slugPet: true,
    breed: true,
  },
});

export type PetType = Prisma.PetGetPayload<typeof petSelect> & {
  path: string;
};

const categorySelect = Prisma.validator<Prisma.CategoryArgs>()({
  select: {
    type: true,
    slugCategory: true,
    petID: true,
    pets: petSelect,
  },
});

export type CategoryType = Omit<
  Prisma.CategoryGetPayload<typeof categorySelect>,
  "pets"
> & {
  pets: PetType[];
};

const clinicSelect = Prisma.validator<Prisma.ClinicArgs>()({
  select: {
    title: true,
    categories: categorySelect,
  },
});

export type ClinicType = Omit<
  Prisma.ClinicGetPayload<typeof clinicSelect>,
  "categories"
> & {
  categories: CategoryType[];
};

export default defineEventHandler(async (event): Promise<ClinicType> => {
  const outline = await prisma.clinic.findFirst(clinicSelect);

  // error if there is no course
  if (!outline) {
    throw createError({
      statusCode: 404,
      statusMessage: "Clinic not found",
    });
  }

  // map the outline so we can add a path to each lesson
  const categories = outline.categories.map((category) => ({
    ...category,
    pets: category.pets.map((pet) => ({
      ...pet,
      path: `/profile/category/${category.slugCategory}/pet/${pet.slugPet}`,
    })),
  }));

  return {
    ...outline,
    categories,
  };
});


<template>
  <v-autocomplete
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

  <v-list
    class="vcardlist"
    lines="two"
    v-for="category in categories"
    :key="category.categorySlug"
  >
    <!-- <v-list-subheader>List of Patient</v-list-subheader> -->

    <div class="vlistemcon">
      <div class="vlistem">
        <NuxtLink
          v-for="pet in category.pets"
          :key="pet.petSlug"
          :to="pet.path"
          :class="{
            'text-blue-500': pet.path === $route.fullPath,
            'text-gray-600': pet.path !== $route.fullPath,
          }"
        >
          <v-list-item :prepend-avatar="dp" title="pet.petName">
            <template v-slot:subtitle>
              <span class="font-weight-bold">{{
                pet.breed - category.petID
              }}</span>
            </template>
          </v-list-item>
          <v-divider :thickness="2" class="vcardivider" inset></v-divider>
        </NuxtLink>
      </div>

      <div class="vpagin">
        <v-pagination :length="4" rounded="circle"></v-pagination>
      </div>
    </div>
  </v-list>
</template>

<script setup>
import dp from "@/assets/images/corgi.jpeg";

const meta = await useMeta();
const { categories } = meta;
</script>


// let initials = "";
// const fullName = "Racket ship";
// console.log(fullName.split(" "));
/*
const [firstName, lastName] = "Jonas Schmedtmann".split(" ");

console.log(firstName, lastName);

const initials = () => {
  const combine = [
    firstName.slice(0, 1).toUpperCase(),
    lastName.slice(0, 1).toUpperCase(),
  ].join("");

  return combine;
};

console.log(initials());

const initial = [
  firstName.slice(0, 1).toUpperCase(),
  lastName.slice(0, 1).toUpperCase(),
].join("");
console.log(initial);

/*
setTimeout(() => (this.loading = false), 2000);

<template>
  <v-card class="ml-px-6 py-8" max-width="344">
    <v-form v-model="form" @submit.prevent="onSubmit">
      <v-text-field
        v-model="email"
        :readonly="loading"
        :rules="[required]"
        class="mb-2"
        clearable
        label="Email"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :readonly="loading"
        :rules="[required]"
        clearable
        label="Password"
        placeholder="Enter your password"
      ></v-text-field>

      <br />

      <NuxtLink to="/profile">
        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          @click="loading = !loading"
          >Sign In
        </v-btn>
      </NuxtLink>

      <NuxtLink to="/signUp">SignUp Here</NuxtLink>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    form: false,
    email: null,
    password: null,
    loading: false,
  }),

  methods: {
    onSubmit() {
      if (!this.form) return;

      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
    required(v) {
      return !!v || "Field is required";
    },
  },
};
</script>
*/


const filteredLists = computed(() => {
  return categories.map((category) => {
    return category.pets.filter(pet => 
      (pet.petName.toLowerCase().includes(searchName.value.toLowerCase()))
    )
  })
});


const categories =  meta.value.categories.map((category) => ({
  ...category,
  pets: category.pets.map((pet) => ({
    ...pet,
  })),
}));

console.log(categories)





const filteredLists = computed(() => {
return categories.filter((category) => {
  return category.pets.map(pet => (pet.petName.toLowerCase().includes(searchName.value.toLowerCase())));
})
});




console.log(filteredLists.value)



<NuxtLink
              class="listLink"
              v-for="pet in category.pets"
              :key="pet.slugPet"
              :to="pet.path"
            >
              <v-list-item :prepend-avatar="dp" :title="pet.petName">
                <template v-slot:subtitle>
                  <span class="font-weight-bold">{{
                    category.petID + " " + "|" + pet.breed
                  }}</span>
                </template>
              </v-list-item>
              <v-divider :thickness="2" class="vcardivider" inset></v-divider>
            </NuxtLink>


            let search = allLists.value.categories.filter((category) => {
             
              return category.pets.petName?.toLowerCase().indexOf(filters.value.search.toLocaleLowerCase()) >= 0;
            });

const pets = categories.map((category) => {
  return category.pets
})

const { data, error } = await useFetch<T>(url, {
  headers: useRequestHeaders(["cookie"]),
});

if (error.value) {
  throw createError({
    ...error.value,
    statusMessage: `Could not fetch data from ${url}`,
  });
}



const currentPage = useCurrentPage();
    const maxPage = computed(() => Math.ceil(filteredJobs.value.length / 10));
    const { previousPage, nextPage } = usePreviousAndNextPages(
      currentPage,
      maxPage
    );

    /*
    const previousPage = computed(() => {
      const previousPage = currentPage.value - 1;
      const firstPage = 1;
      return previousPage >= firstPage ? previousPage : undefined;
    });
    const nextPage = computed(() => {
      const nextPage = currentPage.value + 1;
      const maxPage = Math.ceil(filteredJobs.value.length / 10);
      return nextPage <= maxPage ? nextPage : undefined;
    });
    */

    const displayedJobs = computed(() => {
      const pageNumber = currentPage.value;
      const firstJobIndex = (pageNumber - 1) * 10;
      const lastJobIndex = pageNumber * 10;
      return filteredJobs.value.slice(firstJobIndex, lastJobIndex);
    });


    reloadNuxtApp({
      path: "/profile",
      query: {
        page: previousPage || nextPage,
      },
      ttl: 1000, // default 10000
    });


// const category = await prisma.category.findFirst({
  //   where: {
  //     slugCategory: slugCategory,
  //     pets: {
  //       slugPet: pet.slugPet,
  //     },
  //   },
  // });

  // if (!category) {
  //   throw createError({
  //     statusCode: 404,
  //     message: "Category not found",
  //   });
  // }

  // const owner = await prisma.owner.findFirst({
  //   where: {
  //     Pet: {
  //       slugPet: slugPet,
  //       Category: {
  //         slugCategory: slugCategory,
  //       },
  //     },
  //   },
  // });

  // if (!owner) {
  //   throw createError({
  //     statusCode: 404,
  //     message: "Owner not found",
  //   });
  // }

  // const {
  //   petName,
  //   petID,
  //   petAge,
  //   breed,
  //   birth,
  //   gender,
  //   type,
  //   firstName,
  //   lastName,
  //   ownerAge,
  //   contact,
  //   address,
  // } = await readBody(event);