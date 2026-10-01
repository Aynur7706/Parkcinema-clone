export function getTicketOptions(screening) {
  const price = screening?.price?.[0];
  if (!price) return [];
  const discounts = price.discounts || [];
  const adult = discounts.find(item => item.discountType === 'ADULT');
  const family = discounts.find(item => item.discountType === 'FAMILY');
  const options = [];
  if (family && Number.isFinite(Number(family.discountValue))) {
    options.push({ type: 'FAMILY', label: 'Ailə', price: Number(family.discountValue), min: family.min || 1, max: family.max || 4 });
  }
  const adultPrice = Number(adult?.discountValue ?? price.price);
  if (Number.isFinite(adultPrice)) options.push({ type: 'ADULT', label: 'Böyük', price: adultPrice, min: adult?.min || 1, max: adult?.max || 10 });
  const child = discounts.find(item => item.discountType === 'CHILD');
  const childPrice = Number(child?.discountValue ?? adultPrice);
  if (Number.isFinite(childPrice)) options.push({ type: 'CHILD', label: 'Uşaq', price: childPrice, min: child?.min || 1, max: child?.max || 10 });
  return options;
}

export function addSeat(seats, seat, option) {
  if (!option || !seat.available || seats.some(item => item.sira === seat.sira && item.yer === seat.yer)) return seats;
  if (seats.filter(item => item.ticketType === option.type).length >= option.max) return seats;
  return [...seats, { sira: seat.sira, yer: seat.yer, ticketType: option.type, price: option.price }];
}

export function removeSeat(seats, row, number) {
  return seats.filter(seat => seat.sira !== row || seat.yer !== number);
}

export function validateSeatSelection(seats, options) {
  if (!seats.length) return 'Zəhmət olmasa oturacaq seçin';
  for (const option of options) {
    const count = seats.filter(seat => seat.ticketType === option.type).length;
    if (count && (count < option.min || count > option.max)) return `${option.label} bileti üçün ${option.min}–${option.max} yer seçin`;
  }
  return '';
}

