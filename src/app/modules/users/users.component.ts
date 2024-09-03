import { Component } from '@angular/core';
import { TableComponent } from '@components/users/table/table.component';
import { UserApp } from '@models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  // * Primera Tabla
  columns_table = [
    {
      id: 'id',
      title: 'id'
    },
    {
      id: 'name',
      title: 'nameTxt'
    },
    {
      id: 'business_role',
      title: 'Rol'
    },
    {
      id: 'url_linkendin',
      title: 'Profile'
    },
    {
      id: 'isActive',
      title: 'Estado'
    },
    {
      id: 'biography',
      title: 'Biografía'
    },
    {
      id: 'location',
      title: 'Ubicación'
    },
    {
      id: 'profile_image',
      title: 'url'
    }

  ]
  datasource: any = []


  // * Segunda Tabla

  columns_table2 = [
    {
      id: "name",
      title: "Nombre"
    },
    {
      id: "surname",
      title: "Apellido"
    },
    {
      id: "age",
      title: "Edad"
    },
    {
      id: "address",
      title: "Dirección"
    },
  ]

  datasource2 = [{
    name: '1',
    surname: '1',
    age: '1',
    address: '1'
  }, {
    name: '2',
    surname: '2',
    age: '2',
    address: '2'
  }, {
    name: '3',
    surname: '3',
    age: '3',
    address: '3'
  }

  ]

  constructor() {

    const users: UserApp[] = [];
    for (let i = 1; i <= 100; i++) {
      users.push(createNewUser(i));
    }

    this.datasource = users;
  }


}
const NAMES = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];


function createNewUser(id: number): UserApp {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';
  return {
    id: id,
    name: name,
    business_role: 'User',
    url_linkendin: 'local',
    isActive: true,
    biography: 'Lorem Impsun',
    profile_image: 'url',
    location: {
      latitude: 'asda',
      longitude: 'asda',
    }
  };
}