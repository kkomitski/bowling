# Component Testing Practice

## 1. Toggle Component (`src/components/toggle.tsx`)

**What to test:**
- Renders with initial value OFF (default)
- Renders with initial value ON when `initialValue={true}`
- Toggles from OFF to ON when clicked
- Toggles from ON to OFF when clicked
- Calls `onToggle` callback with correct value when toggled
- Displays label when provided
- Button has correct `aria-pressed` attribute based on state
- Button has correct CSS class (`toggle-on` or `toggle-off`)

---

## 2. Counter Component (`src/components/counter.tsx`)

**What to test:**
- Renders with initial count (default 0)
- Renders with custom initial count
- Increments count when + button clicked
- Decrements count when - button clicked
- Resets to initial value when Reset clicked
- Respects minimum boundary (decrement button disabled at min)
- Respects maximum boundary (increment button disabled at max)
- Uses custom step value for increment/decrement
- Multiple increments work correctly
- Cannot go below min or above max

---

## 3. Input Component (`src/components/input.tsx`)

**What to test:**
- Renders with placeholder text
- Updates value when user types
- Calls `onChange` callback with new value
- Shows character count
- Shows character count with max length (e.g., "5 / 10")
- Displays error when exceeding max length
- Does not update value when max length exceeded
- Error disappears when valid input entered
- Supports different input types (text, email, password)

---

## 4. Dropdown Component (`src/components/dropdown.tsx`)

**What to test:**
- Renders with placeholder text initially
- Shows dropdown list when button clicked
- Hides dropdown list initially
- Selects option when clicked
- Displays selected value in button
- Closes dropdown after selection
- Calls `onSelect` callback with selected value
- Renders all provided options
- Toggles dropdown open/closed on button click

---

## 5. Modal Component (`src/components/modal.tsx`)

**What to test:**
- Does not render when `isOpen={false}`
- Renders when `isOpen={true}`
- Displays title when provided
- Renders children content
- Calls `onClose` when Close button clicked
- Calls `onClose` when Escape key pressed
- Does not call `onClose` when other keys pressed
- Cleans up event listener on unmount
- Multiple modals can exist independently

---

## Tips for Writing Tests

1. **Use `screen.getByTestId()`** to find elements reliably
2. **Use `fireEvent` or `userEvent`** to simulate user interactions
3. **Test both behavior and output** - what happens when you interact?
4. **Mock callbacks** with Jest mock functions to verify they're called
5. **Use `toBeDisabled()`, `toHaveTextContent()`, etc.** for cleaner assertions
6. **Test edge cases** - boundaries, empty states, error states
7. **Re-query elements after state changes** if needed

Good luck with your testing practice! 🚀
