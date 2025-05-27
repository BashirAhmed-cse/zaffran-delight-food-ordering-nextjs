
import React from 'react'

const Footer = () => {
  return (
    <footer className="flex flex-col space-y-10 justify-center mb-5">

    <div className="flex justify-center space-x-5">
        <a href="https://www.facebook.com/ZaffranDelightTX" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" />
        </a>
        
        <a href="https://www.instagram.com/zaffrandelight/" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" />
        </a>
        
    </div>
    <p className="text-center text-gray-100 font-medium">&copy; 2025 The Zaffran Delight. All rights reservered.</p>
</footer>
  )
}

export default Footer