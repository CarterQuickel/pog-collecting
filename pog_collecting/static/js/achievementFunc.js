function checkMillionaireAchievement() {
    // Loop through all achievements in the "economy" category
    achievements[3].forEach(achievement => {
        if (achievement.name === "Elon" && money >= 1000000) {
            // Unlock the "Elon" achievement if the user has at least 1 million cash
            achievement.status = true;
            achievement.hidden = false; // Reveal the achievement if it was hidden
            console.log(`Achievement Unlocked: ${achievement.name}`);
        }
    });
}

// Call this function periodically to check the condition
setInterval(checkMillionaireAchievement, 1000); // Check every second