// Adding a new function to the creeps
Creep.prototype.pickupEnergy = function() {
    /** @var {Creep} creep */
    var creep = this

    // Find all dropped energies from the room
    var droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, (resource) => resource.resourceType == RESOURCE_ENERGY);

    // Find the closest one
    var closestDroppedEnergy = creep.pos.findClosestByRange(droppedEnergy);

    // The creep tries to pickup the energy
    if (creep.pickup(closestDroppedEnergy) == ERR_NOT_IN_RANGE) {

        // If it's too far away, it gets closer
        creep.moveTo(closestDroppedEnergy)
    }
}