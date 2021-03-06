import { Component, OnDestroy, OnInit ,ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { IRoleReportingTo } from '../models/RoleReportingTo';
import * as Xlsx from 'xlsx';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: fuseAnimations
})
export class UserComponent implements OnInit, OnDestroy {
  form: FormGroup;
  reportingToDDL: IRoleReportingTo[] = [{ id: 1, description: 'Admin' }, { id: 2, description: 'MD' }, { id: 3, description: 'Manager' }, { id: 4, description: 'Ceo' }];
  genderDDl: any[] = [{ 'id': 1, 'description': 'Male' }, { 'id': 2, 'description': 'Female' }];
  rowData: any[] = [];
  columnDef: any[] = [];


  constructor(private _formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    // Reactive Form
    this.form = this._formBuilder.group({

      name: ['', Validators.required],
      empId: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: [''],
      startDate: [''],
      toDate: [''],
      roleId: ['', Validators.required],
    });

    this.columnDef = [{ 'header': 'Name', 'field': 'name', 'type': 'label' },
    { 'header': 'Employee ID', 'field': 'empId', 'type': 'label' },
    { 'header': 'Email', 'field': 'email', 'type': 'label' },
    { 'header': 'Mobile', 'field': 'phone', 'type': 'label' },
    { 'header': 'Role', 'field': 'role', 'type': 'label' },
    { 'header': 'Date', 'field': 'dates', 'type': 'label' },
    { 'header': 'Status', 'field': 'status', 'type': 'label' }
    ];

    this.rowData = [
      {
        'id': '1',
        'name': 'Reyna',
        'empId': 435345345,
        'email': 'test@gmail.com',
        'phone': '23456456456',
        'roleId': 2,
        'role': 'MD',
        'dates': '01/03/2020 to till date',
        'status': 'Active'
      },
      {
        'id': '1',
        'name': 'koli',
        'empId': 435345345,
        'email': 'test@gmail.com',
        'phone': '23456456456',
        'roleId': 2,
        'role': 'MD',
        'dates': '01/03/2020 to till date',
        'status': 'Active'
      },
      {
        'id': '1',
        'name': 'sachin',
        'empId': 435345345,
        'email': 'test@gmail.com',
        'phone': '23456456456',
        'roleId': 2,
        'role': 'MD',
        'dates': '01/03/2020 to till date',
        'status': 'Active'
      },
      {
        'id': '1',
        'name': 'dhoni',
        'empId': 435345345,
        'email': 'test@gmail.com',
        'phone': '23456456456',
        'roleId': 2,
        'role': 'MD',
        'dates': '01/03/2020 to till date',
        'status': 'Active'
      },

    ];
  }

  clear() {
    this.form.reset();
  }

  save() {

    if (this.form.valid) {
      let model = this.form.value;
      let startDate = new Date(this.form.value);
    }
  }

  /**
     * On destroy
     */
  ngOnDestroy(): void {
  }

  selectedRows(eve) {
    eve.selected[0]['gender'] = 1;
    eve.selected[0]['birthDate'] = new Date();
    eve.selected[0]['startDate'] = new Date();
    eve.selected[0]['toDate'] = new Date();
    this.form.patchValue(eve.selected[0]);


    var ele = document.getElementsByClassName('mat-tab-label') as HTMLCollectionOf<HTMLElement>;
    ele[0].click();

  }

  download() {
    const ws: Xlsx.WorkSheet = Xlsx.utils.json_to_sheet(this.rowData);
    const wb: Xlsx.WorkBook = Xlsx.utils.book_new();
    Xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    Xlsx.writeFile(wb, '.xls');
  } 
}
