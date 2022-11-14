<template>
  <v-container>
    <v-row>
      <v-col>
        <p class="text-h5">Sign In</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Field name="email" v-slot="{ field, errors }">
          <v-text-field v-bind="field" :error-messages="errors" />
        </Field>
        <Field name="password" v-slot="{ field, errors }">
          <v-text-field v-bind="field" :error-messages="errors" />
        </Field>
        <v-btn>sign in</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>Oppure</v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn>Accedi con google</v-btn>
        <v-btn>Accedi con facebook</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
import SignInSchema from "../validations/signIn";
import { useForm } from "vee-validate";
import { Field } from "vee-validate";

const form = useForm({ validationSchema: SignInSchema });
</script>
