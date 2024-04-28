import React from 'react'

export default function UpdateEntryForm() {
  return (
    <div className="bg-green-200 min-h-screen flex items-center">
  <div className="bg-white p-10 md:w-2/3 lg:w-1/2 mx-auto rounded">
    <form action="">
      <div className="flex items-center mb-5">
        <label
          htmlFor="name"
          className="w-20 inline-block text-right mr-4 text-gray-500  "
        >
          Name
        </label>
        <input
          name="name"
          id="name"
          type="text"
          placeholder="Your name"
          className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-green-400"
        />
      </div>
      <div className="flex items-center mb-10">
        <label
          htmlFor="twitter"
          className="w-20 inline-block text-right mr-4 text-gray-500 "
        >
          Twitter
        </label>
        <input
          type="text"
          name="twitter"
          id="twitter"
          placeholder="Your Twitter pseudonym"
          className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-green-400"
        />
      </div>
      <div className="text-right">
        <button className="py-3 px-8 bg-green-500 text-green-100 font-bold rounded">
          Submit
        </button>
      </div>
    </form>
  </div>
</div>

  )
}
