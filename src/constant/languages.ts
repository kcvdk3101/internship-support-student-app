const LanguagesData = {
  Chinese: {
    name: 'Chinese',
  },
  English: {
    name: 'English',
  },
  French: {
    name: 'French',
  },
  German: {
    name: 'German',
  },
  Japanese: {
    name: 'Japanese',
  },
  Korean: {
    name: 'Korean',
  },
  Thai: {
    name: 'Thai',
  },
}

const Languages = Object.values(LanguagesData).map((language) => {
  return { label: language.name, value: language.name }
})

export default Languages
