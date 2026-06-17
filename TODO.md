# Airport 3D Simulator Fixes

## Issues to Fix
- [ ] **Time Display NaN:NaN:NaN** - Debug simTime initialization and formatTime function
- [ ] **Pause/Resume not working** - Verify pause logic in animate loop
- [ ] **No planes spawning initially** - First plane spawns after 30 seconds; add immediate spawn on init
- [ ] **Time scale affects simulation but not spawning correctly** - Fix spawn timing with timeScale
- [ ] **Scene too dark / lights not visible** - Adjust fog, ambient light, and verify runway/taxiway lights render
- [ ] **Add initial aircraft on load** - So user sees activity immediately

## Testing
- [ ] Verify time displays correctly (HH:MM:SS)
- [ ] Verify pause/resume toggles simulation
- [ ] Verify time scale slider changes simulation speed
- [ ] Verify planes spawn and follow full lifecycle (approach → land → taxi → gate → takeoff → climb)
- [ ] Verify lighting looks correct (daytime appearance with visible lights)