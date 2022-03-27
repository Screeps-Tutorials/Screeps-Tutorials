findPositionsInsideRect = function(rect) {

    const positions = []

    for (let x = rect.x1; x <= rect.x2; x++) {
        for (let y = rect.y1; y <= rect.y2; y++) {

            // Iterate if the pos doesn't map onto a room

            if (x < 0 || x >= constants.roomDimensions ||
                y < 0 || y >= constants.roomDimensions) continue

            // Otherwise ass the x and y to positions

            positions.push({ x, y })
        }
    }

    return positions
}

Room.prototype.distanceTransform = function(initialCM, enableVisuals, x1 = constants.roomDimensions, y1 = constants.roomDimensions, x2 = -1, y2 = -1) {

    const room = this

    // Use a costMatrix to record distances. Use the initialCM if provided, otherwise create one

    const distanceCM = initialCM || new PathFinder.CostMatrix()

    for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {

            // Iterate if pos is to be avoided

            if (distanceCM.get(x, y) == 255) continue

            // Otherwise construct a rect and get the positions in a range of 1

            const rect = { x1: x - 1, y1: y - 1, x2: x + 1, y2: y + 1 }
            const adjacentPositions = findPositionsInsideRect(rect)

            // Construct the distance value as the avoid value

            let distanceValue = 255

            // Iterate through positions

            for (const adjacentPos of adjacentPositions) {

                // Get the value of the pos in distanceCM

                const value = distanceCM.get(adjacentPos.x, adjacentPos.y)

                // Iterate if the value has yet to be configured

                if (value == 0) continue

                // If the value is to be avoided, stop the loop

                if (value == 255) {

                    distanceValue = 1
                    break
                }

                // Otherwise check if the depth is less than the distance value. If so make it the new distance value plus one

                if (value < distanceValue) distanceValue = 1 + value
            }

            // If the distance value is that of avoid, set it to 1

            if (distanceValue == 255) distanceValue = 1

            // Record the distanceValue in the distance cost matrix

            distanceCM.set(x, y, distanceValue)
        }
    }

    for (let x = x2; x >= x1; x--) {
        for (let y = y2; y >= y1; y--) {

            // Iterate if pos is to be avoided

            if (distanceCM.get(x, y) == 255) continue

            // Otherwise construct a rect and get the positions in a range of 1

            const rect = { x1: x - 1, y1: y - 1, x2: x + 1, y2: y + 1 }
            const adjacentPositions = findPositionsInsideRect(rect)

            // Construct the distance value as the avoid value

            let distanceValue = 255

            // Iterate through positions

            for (const adjacentPos of adjacentPositions) {

                // Get the value of the pos in distanceCM

                const value = distanceCM.get(adjacentPos.x, adjacentPos.y)

                // Iterate if the value has yet to be configured

                if (value == 0) continue

                // If the value is to be avoided, stop the loop

                if (value == 255) {

                    distanceValue = 1
                    break
                }

                // Otherwise check if the depth is less than the distance value. If so make it the new distance value plus one

                if (value < distanceValue) distanceValue = 1 + value
            }

            // If the distance value is that of avoid, set it to 1

            if (distanceValue == 255) distanceValue = 1

            // Record the distanceValue in the distance cost matrix

            distanceCM.set(x, y, distanceValue)

            // If roomVisuals are enabled, show the terrain's distanceValue

            if (enableVisuals && Memory.roomVisuals) room.visual.rect(x - 0.5, y - 0.5, 1, 1, {
                fill: 'hsl(' + 200 + distanceValue * 10 + ', 100%, 60%)',
                opacity: 0.4,
            })
        }
    }

    return distanceCM
}