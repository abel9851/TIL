# timezone

- time delta

```python

# 커맨드 설정 중에.

class Command(BaseCommand):
    help = "This command creates many reservations"

    def add_arguments(self, parser):
        parser.add_argument(
            "--number",
            default=2,
            type=int,
            help="how many reservations do you want to create",
        )

    def handle(self, *args, **options):
        number = options.get("number")
        seeder = Seed.seeder()
        rooms = room_models.Room.objects.all()
        users = user_models.User.objects.all()
        seeder.add_entity(
            reservation_models.Reservation,
            number,
            {
                "status": lambda x: random.choice(["pending", "confirmed", "canceled"]),
                "guest": lambda x: random.choice(users),
                "room": lambda x: random.choice(rooms),
                "check_in": lambda x: datetime.now(),
                "check_out": lambda x: datetime.now()
                + timedelta(days=random.randint(3, 25)), #
            },
        )
        seeder.execute()
        self.stdout.write(self.style.SUCCESS(f"{number} reservations created!"))
```

time delta를 쓰면 datetime.now() 현재에서 +로,  
날짜를 더해줄 수 있다.
