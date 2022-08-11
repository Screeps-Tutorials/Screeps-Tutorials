const roomDimensions = 50

findPositionsInsideRect = function(rect) {

    const positions = []

    for (let x = rect.x1; x <= rect.x2; x++) {
        for (let y = rect.y1; y <= rect.y2; y++) {

            // Iterate if the pos doesn't map onto a room

            if (x < 0 || x >= roomDimensions ||
                y < 0 || y >= roomDimensions) continue

            // Otherwise ass the x and y to positions

            positions.push({ x, y })
        }
    }

    return positions
}

Room.prototype.floodFill = function(seeds) {

    const room = this

    // Construct a cost matrix for the flood

    const floodCM = new PathFinder.CostMatrix(),

        // Get the terrain cost matrix

        terrain = room.getTerrain(),

        // Construct a cost matrix for visited tiles and add seeds to it

        visitedCM = new PathFinder.CostMatrix()

    // Construct values for the flood

    let depth = 0,

        thisGeneration = seeds,

        nextGeneration = []

    // Loop through positions of seeds

    for (const pos of seeds) {

        // Record the seedsPos as visited

        visitedCM.set(pos.x, pos.y, 1)
    }

    // So long as there are positions in this gen

    while (thisGeneration.length) {

        // Reset next gen

        nextGeneration = []

        // Iterate through positions of this gen

        for (const pos of thisGeneration) {

            // If the depth isn't 0

            if (depth != 0) {

                // Iterate if the terrain is a wall

                if (terrain.get(pos.x, pos.y) == TERRAIN_MASK_WALL) continue

                // Otherwise so long as the pos isn't a wall record its depth in the flood cost matrix

                floodCM.set(pos.x, pos.y, depth)

                // If visuals are enabled, show the depth on the pos

                if (Memory.roomVisuals) room.visual.rect(pos.x - 0.5, pos.y - 0.5, 1, 1, {
                    fill: 'hsl(' + 200 + depth * 2 + ', 100%, 60%)',
                    opacity: 0.4,
                })
            }

            // Construct a rect and get the positions in a range of 1

            const rect = { x1: pos.x - 1, y1: pos.y - 1, x2: pos.x + 1, y2: pos.y + 1 },
                adjacentPositions = findPositionsInsideRect(rect)

            // Loop through adjacent positions

            for (const adjacentPos of adjacentPositions) {

                // Iterate if the adjacent pos has been visited or isn't a tile

                if (visitedCM.get(adjacentPos.x, adjacentPos.y) == 1) continue

                // Otherwise record that it has been visited

                visitedCM.set(adjacentPos.x, adjacentPos.y, 1)

                // Add it to the next gen

                nextGeneration.push(adjacentPos)
            }
        }

        // Set this gen to next gen

        thisGeneration = nextGeneration

        // Increment depth

        depth++
    }

    return floodCM
}
