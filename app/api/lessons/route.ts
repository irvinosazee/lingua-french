import { NextResponse } from "next/server"

// Mock lesson data - in a real app, this would come from a database
const lessons = [
  {
    id: 1,
    title: "Basic Greetings",
    description: "Learn essential French greetings and polite expressions",
    vocabulary: [
      { id: 1, french: "Bonjour", english: "Hello/Good morning", pronunciation: "bon-ZHOOR" },
      { id: 2, french: "Bonsoir", english: "Good evening", pronunciation: "bon-SWAHR" },
      { id: 3, french: "Salut", english: "Hi/Bye (informal)", pronunciation: "sah-LUU" },
      { id: 4, french: "Au revoir", english: "Goodbye", pronunciation: "oh ruh-VWAHR" },
      { id: 5, french: "Merci", english: "Thank you", pronunciation: "mer-SEE" },
      { id: 6, french: "S'il vous plaît", english: "Please (formal)", pronunciation: "seel voo PLEH" },
    ],
    exercises: [
      {
        id: 1,
        type: "mcq",
        question: "How do you say 'Hello' in French?",
        options: ["Bonjour", "Bonsoir", "Salut", "Au revoir"],
        correctAnswer: "Bonjour",
        xpReward: 10,
      },
      {
        id: 2,
        type: "translate",
        question: "Translate: Thank you",
        correctAnswer: "Merci",
        xpReward: 15,
      },
      {
        id: 3,
        type: "listening",
        question: "What did you hear?",
        correctAnswer: "Bonjour",
        xpReward: 20,
      },
    ],
  },
  {
    id: 2,
    title: "Numbers 1-20",
    description: "Master French numbers from one to twenty",
    vocabulary: [
      { id: 7, french: "Un", english: "One", pronunciation: "uhn" },
      { id: 8, french: "Deux", english: "Two", pronunciation: "duh" },
      { id: 9, french: "Trois", english: "Three", pronunciation: "twah" },
      { id: 10, french: "Quatre", english: "Four", pronunciation: "KAH-truh" },
      { id: 11, french: "Cinq", english: "Five", pronunciation: "sank" },
      { id: 12, french: "Six", english: "Six", pronunciation: "sees" },
      { id: 13, french: "Sept", english: "Seven", pronunciation: "set" },
      { id: 14, french: "Huit", english: "Eight", pronunciation: "weet" },
    ],
    exercises: [
      {
        id: 4,
        type: "mcq",
        question: "What is 'Three' in French?",
        options: ["Deux", "Trois", "Quatre", "Cinq"],
        correctAnswer: "Trois",
        xpReward: 10,
      },
      {
        id: 5,
        type: "translate",
        question: "Translate: Five",
        correctAnswer: "Cinq",
        xpReward: 15,
      },
    ],
  },
  {
    id: 3,
    title: "Family Members",
    description: "Learn vocabulary for family relationships",
    vocabulary: [
      { id: 15, french: "Famille", english: "Family", pronunciation: "fah-MEEL" },
      { id: 16, french: "Père", english: "Father", pronunciation: "pair" },
      { id: 17, french: "Mère", english: "Mother", pronunciation: "mair" },
      { id: 18, french: "Frère", english: "Brother", pronunciation: "frair" },
      { id: 19, french: "Sœur", english: "Sister", pronunciation: "sur" },
    ],
    exercises: [
      {
        id: 6,
        type: "mcq",
        question: "How do you say 'Mother' in French?",
        options: ["Père", "Mère", "Frère", "Sœur"],
        correctAnswer: "Mère",
        xpReward: 10,
      },
    ],
  },
  {
    id: 4,
    title: "Colors",
    description: "Discover French color vocabulary",
    vocabulary: [
      { id: 20, french: "Rouge", english: "Red", pronunciation: "roozh" },
      { id: 21, french: "Bleu", english: "Blue", pronunciation: "bluh" },
      { id: 22, french: "Vert", english: "Green", pronunciation: "vair" },
      { id: 23, french: "Jaune", english: "Yellow", pronunciation: "zhohn" },
      { id: 24, french: "Noir", english: "Black", pronunciation: "nwahr" },
      { id: 25, french: "Blanc", english: "White", pronunciation: "blahn" },
    ],
    exercises: [
      {
        id: 7,
        type: "translate",
        question: "Translate: Blue",
        correctAnswer: "Bleu",
        xpReward: 15,
      },
    ],
  },
  {
    id: 5,
    title: "At the Restaurant",
    description: "Essential vocabulary for dining out in France",
    vocabulary: [
      { id: 26, french: "Restaurant", english: "Restaurant", pronunciation: "res-toh-RAHN" },
      { id: 27, french: "Menu", english: "Menu", pronunciation: "muh-NU" },
      { id: 28, french: "Eau", english: "Water", pronunciation: "oh" },
      { id: 29, french: "Pain", english: "Bread", pronunciation: "pan" },
      { id: 30, french: "L'addition", english: "The bill", pronunciation: "lah-dee-SYOHN" },
    ],
    exercises: [
      {
        id: 8,
        type: "mcq",
        question: "How do you ask for the bill in French?",
        options: ["Menu", "L'addition", "Eau", "Pain"],
        correctAnswer: "L'addition",
        xpReward: 10,
      },
    ],
  },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json(lessons)
  } catch (error) {
    console.error("Error fetching lessons:", error)
    return NextResponse.json({ error: "Failed to fetch lessons" }, { status: 500 })
  }
}
