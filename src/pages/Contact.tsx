const { error } = await supabase.from('quotes').insert({
  name, email, phone, event_date: date, cake_type: type, guests: Number(guests), message,
})